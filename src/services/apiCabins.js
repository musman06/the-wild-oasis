import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin, editId) {
  let imageName;
  let imagePath;
  if (typeof newCabin.image === "object") {
    imageName =
      `${Math.floor(Math.random() * 1000000000)}-${newCabin.image.name}`.replaceAll(
        "/",
        "",
      );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else {
    imagePath = newCabin.image;
  }

  let query = supabase.from("cabins");

  if (!editId) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (editId) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      editId ? "Cabin cannot be edited" : "Cabin cannot be created",
    );
  }

  if (typeof newCabin.image === "object") {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      if (!editId) await supabase.from("cabins").delete().eq("id", data.id);

      console.error(storageError);
      throw new Error(
        !editId
          ? "Cabin image cannot be uploaded & the cabin is not created"
          : "Cabin is edited but image cannot be updated",
      );
    }
  }

  return data;
}

const getCabins = async () => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
};

export default getCabins;

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin cannot be deleted");
  }

  return data;
}
