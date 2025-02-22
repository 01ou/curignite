import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

const useCurrentDialogueId = (defaultId: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  // useMemo で currentId を計算
  const currentId = useMemo(() => {
    return new URLSearchParams(location.search).get("id") || defaultId;
  }, [location.search, defaultId]);

  // useCallback で setDialogueId をメモ化
  const setDialogueId = useCallback(
    (newId: string) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("id", newId);
      navigate({ search: searchParams.toString() }, { replace: true });
    },
    [location.search, navigate]
  );

  return { currentId, setDialogueId };
};

export default useCurrentDialogueId;
