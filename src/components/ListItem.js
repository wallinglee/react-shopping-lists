import { CiSquareRemove } from "react-icons/ci";

export const ListItem = ({ item, toggleComplete, removeItem, list }) => {
  return (
    <li
      key={item.id}
      className={"list-item" + (item.completed ? " completed" : "")}
    >
      <p onClick={() => toggleComplete(list, item.id)}>{item.text}</p>
      {item.completed && (
        <>
          <CiSquareRemove
            size="24"
            onClick={() => {
              removeItem(item, list);
            }}
          />
        </>
      )}
    </li>
  );
};
