import { FloatButton } from "antd";
import { ThemeContext } from "../../../app/ThemeContext";
import { useContext } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import styles from "./ThemeChanger.module.css";

export function ThemeChanger() {
  const theme = useContext(ThemeContext);
  return (
    <FloatButton
      onClick={() => theme?.setIsDark(!theme.isDark)}
      icon={theme?.isDark ? <SunOutlined /> : <MoonOutlined />}
      className={styles.themeChanger}
    />
  );
}
