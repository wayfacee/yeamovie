import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const paths = [{ name: "Назад", onClick: () => navigate(-1) }];

export const BREADCRUMB_PATHS = [];