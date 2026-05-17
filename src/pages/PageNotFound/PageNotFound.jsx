import Heading from "@/components/Heading/Heading";
import "./pagenotfound.css";

import { useMoveBack } from "../../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="page-not-found">
      <div className="box">
        <Heading
          Variant="h1"
          text="The page you are looking for could not be found 😢"
        />
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
