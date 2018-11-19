import React from "react";
import SaveIcon from "../../assets/save";

export default function SaveCanvas({ canvasChanger }) {
    const handlerDownload = () => {
        const a = document.createElement("a");
        a.setAttribute("href", canvasChanger());
        a.setAttribute("download", "img");

        a.style.display = "none";
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    };

    return <SaveIcon onClick={handlerDownload} />;
}
