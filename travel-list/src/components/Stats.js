export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing List🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        🙈You have {numItems} items in your packing list. And you already packed{" "}
        {packedItems} {percentage}(%)
      </em>
    </footer>
  );
}
