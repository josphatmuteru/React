import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { countryName, emoji } = country;
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
