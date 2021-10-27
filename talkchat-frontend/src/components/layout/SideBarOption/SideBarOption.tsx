import "./SideBarOption.css";
import { useHistory } from "react-router-dom";
import { Icon } from "@mui/material";
interface SideBarOptionProps {
  Icon?: any;
  title?: string;
  id?: string;
  canAddChannel?: boolean;
}
const SidebarOption = ({ Icon, title, id, canAddChannel }: SideBarOptionProps) => {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push("/title/");
    }
  };

  const addChannel = () => {
    // const channelName = prompt("Enter the channel name");

    // if (channelName) {
    //   db.collection("rooms").add({
    //     name: channelName,
    //   });
    // }
  };

  return (
    <div
      className="sidebarOption"
      onClick={canAddChannel ? addChannel : selectChannel}
    >
      {Icon && <Icon  className="sidebarOption-icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption-channel">
          <span className="sidebarOption-hash">#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;