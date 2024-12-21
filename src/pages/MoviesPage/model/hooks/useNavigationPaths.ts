import { useNavigate } from "react-router-dom";

export const useNavigationPaths = () => {
  const navigate = useNavigate();

  return [
    { id: 1, name: "Назад", onClick: () => navigate(-1) },
    { id: 2, name: "Главная", to: "/" },
  ];
};