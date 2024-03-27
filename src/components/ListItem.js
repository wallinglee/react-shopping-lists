import { CiSquareRemove } from "react-icons/ci";

export const ListItem = ({ item, toggleItemComplete, deleteItem, list }) => {
  return (
    <li
      key={item.id}
      className={"list-item" + (item.completed ? " completed" : "")}
    >
      <p onClick={() => toggleItemComplete(list, item.id)}>{item.text}</p>
      {item.completed && (
        <>
          <CiSquareRemove
            size="24"
            onClick={() => {
              deleteItem(item, list);
            }}
          />
        </>
      )}
    </li>
  );
};
