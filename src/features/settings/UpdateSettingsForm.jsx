import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import Spinner from "@/components/Spinner/Spinner";
import "./updatesettingsform.css";

import useLoadSettings from "./useLoadSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings = {}, error } = useLoadSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings;

  function handleBlur(e, fieldName) {
    const value = e.target.value;

    if (!value || String(settings[fieldName]) === value) return;

    updateSetting({ [fieldName]: e.target.value });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <div className="setting-row">
        <label className="setting-input-label" htmlFor="min-nights">
          Minimum nights/booking
        </label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "min_booking_length")}
        />
      </div>
      <div className="setting-row">
        <label className="setting-input-label" htmlFor="max-nights">
          Maximum nights/booking
        </label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "max_booking_length")}
        />
      </div>
      <div className="setting-row">
        <label className="setting-input-label" htmlFor="max-guests">
          Maximum guests/booking
        </label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "max_guests_per_booking")}
        />
      </div>
      <div className="setting-row">
        <label className="setting-input-label" htmlFor="breakfast-price">
          Breakfast price
        </label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "breakfast_price")}
        />
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;
