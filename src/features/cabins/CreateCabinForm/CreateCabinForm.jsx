import { useForm } from "react-hook-form";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Textarea from "@/components/TextArea/TextArea";
import Form from "@/components/Form/Form";
import FileInput from "@/components/FileInput/FileInput";
import "./createcabinform.css";

import { formatCurrency } from "@/utils/helpers";
import useCreateCabin from "../useCreateCabin";
import useEditCabin from "../useEditCabin";

function CreateCabinForm({ editCabinData = {}, closeModalWindow }) {
  const { id: editId, ...editValues } = editCabinData;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmission(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        {
          editCabin: {
            ...data,
            image,
          },
          editId: editId,
        },
        {
          onSuccess: () => {
            reset();
            closeModalWindow && closeModalWindow();
          },
        },
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            closeModalWindow && closeModalWindow();
          },
        },
      );
    }
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmission, onError)}
      type={closeModalWindow ? "modal" : "regular"}
    >
      <div className="form-row">
        <label className="form-input-label" htmlFor="name">
          Cabin name
        </label>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
        {errors?.name?.message && (
          <span className="form-input-error ">{errors?.name?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="max_capacity">
          Maximum capacity
        </label>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
        {errors?.max_capacity?.message && (
          <span className="form-input-error ">
            {errors?.max_capacity?.message}
          </span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="regular_price">
          Regular price
        </label>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "Price is required",
            min: {
              value: 99,
              message: `Price should not be less than ${formatCurrency(99)} `,
            },
          })}
        />
        {errors?.regular_price?.message && (
          <span className="form-input-error ">
            {errors?.regular_price?.message}
          </span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="discount">
          Discount
        </label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) => {
              return (
                Number(value) < Number(getValues().regular_price) ||
                "Discount should be less than price"
              );
            },
          })}
        />
        {errors?.discount?.message && (
          <span className="form-input-error ">{errors?.discount?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="description">
          Description for website
        </label>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "Cabin description is required",
          })}
        />
        {errors?.description?.message && (
          <span className="form-input-error ">
            {errors?.description?.message}
          </span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="image">
          Cabin photo
        </label>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
        {errors?.image?.message && (
          <span className="form-input-error ">{errors?.image?.message}</span>
        )}
      </div>

      <div className="form-row">
        {/* type is an HTML attribute! */}
        <Button
          text="Cancel"
          variation="secondary"
          type="reset"
          onClick={closeModalWindow && closeModalWindow}
        />
        <Button
          text={isEditSession ? "Edit cabin" : "Add cabin"}
          variation="primary"
          disabled={isWorking}
        />
      </div>
    </Form>
  );
}

export default CreateCabinForm;
