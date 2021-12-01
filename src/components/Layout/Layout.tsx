import { FC } from "react";
import { Header } from "./Header";

import "./Layout.scss";

interface LayoutProps {}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="layout-container">
    <Header />
    <div className="layout-main">{children}</div>
  </div>
);
