import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch("/api/supported-languages");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setLanguages(data);
      } catch (error) {
        toast.error("Failed to fetch languages");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading };
};

export default getLanguages;
