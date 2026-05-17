import "./form.css";

const Form = ({ type, children, onSubmit }) => {
  return (
    <form className={`form ${type}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
