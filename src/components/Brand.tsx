import { useEffect, useState } from "react";
import { getBrands } from "../services/brandService";

interface Brand {
  id: string;
  nombre: string;
  estado: string;
}

const Brand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await getBrands();
      if (response.success && response.data) {
        setBrands(response?.data);
        setError(null);
      } else {
        setError(response.error || "Error al obtener marcas");
      }

      setLoading(false);
    };
    fetchBrands();
  }, []);

  if (loading) return <p>Cargando marcas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            {brand.nombre} - {brand.id}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Brand;
