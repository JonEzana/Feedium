import {GridLoader} from "react-spinners";

export const Loading = () => {
    return (
        <div className="loading-container">
            <GridLoader loading={true} color={"olive"} />
        </div>
    )
}
