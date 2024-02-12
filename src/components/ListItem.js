import { CiSquareRemove } from "react-icons/ci";

export const ListItem = ({ item, toggleComplete, list, removeItem }) => {
  return (
    <li
      key={item.id}
      className={"list-item" + (item.completed ? " completed" : "")}
    >
      <p onClick={() => toggleComplete(list, item.id)}>{item.text}</p>
      {item.completed && (
        <>
          <CiSquareRemove
            size="20"
            onClick={() => {
              removeItem(item, list);
            }}
          />
        </>
      )}
    </li>
  );
};
