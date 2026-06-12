import { useEffect } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../utils/helpers";
import supabase from "../services/supabase";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

const REFRESH_INTERVAL_DAYS = 5;
const id = 1; // adjust if your settings table uses a different PK

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.error("deleteGuests:", error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.error("deleteCabins:", error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.error("deleteBookings:", error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.error("createGuests:", error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.error("createCabins:", error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((g) => g.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinID - 1);
    const number_nights = subtractDates(booking.end_date, booking.start_date);
    const cabin_price = number_nights * (cabin.regular_price - cabin.discount);
    const extras_price = booking.has_breakfast
      ? number_nights * 15 * booking.number_guests
      : 0;
    const total_price = cabin_price + extras_price;

    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      number_nights,
      cabin_price,
      extras_price,
      total_price,
      guestID: allGuestIds.at(booking.guestID - 1),
      cabinID: allCabinIds.at(booking.cabinID - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.error("createBookings:", error.message);
}

async function uploadAll() {
  await deleteBookings();
  await deleteGuests();
  await deleteCabins();
  await createGuests();
  await createCabins();
  await createBookings();
}

async function getLastUploadDate() {
  const { data, error } = await supabase
    .from("settings")
    .select("last_data_upload")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getLastUploadDate:", error.message);
    return null;
  }
  return data?.last_data_upload ? new Date(data.last_data_upload) : null;
}

async function saveLastUploadDate() {
  const { error } = await supabase
    .from("settings")
    .update({ last_data_upload: new Date().toISOString() })
    .eq("id", id);

  if (error) console.error("saveLastUploadDate:", error.message);
}

function daysSince(date) {
  const ms = Date.now() - date.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

function Uploader() {
  useEffect(() => {
    async function autoRefresh() {
      const lastUpload = await getLastUploadDate();
      const shouldUpload =
        !lastUpload || daysSince(lastUpload) >= REFRESH_INTERVAL_DAYS;

      if (!shouldUpload) {
        const daysAgo = lastUpload ? daysSince(lastUpload).toFixed(1) : "never";
        console.log(
          `[Uploader] Data is fresh. Last upload: ${daysAgo} days ago.`,
        );
        return;
      }

      console.log("[Uploader] Refreshing sample data...");
      await uploadAll();
      await saveLastUploadDate();
      console.log("[Uploader] Sample data refreshed successfully.");
    }

    autoRefresh();
  }, []);

  return null; // no UI rendered
}

export default Uploader;
