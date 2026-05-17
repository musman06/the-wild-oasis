import "./heading.css";

const Heading = ({Variant, text}) => {
    return (
        <Variant className={`heading ${Variant}`}>{text}</Variant>
    );
};

export default Heading;