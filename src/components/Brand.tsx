import { useEffect, useState } from "react";
import { getBrands } from "../services/brandService";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";

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
      <Card>
        <CardBody>
          <h2>Brands</h2>
          <p>Make beautiful websites regardless of your design experience.</p>
          <Select className="max-w-xs" label="Select an animal">
            {brands.map((brand) => (
              <SelectItem key={brand.id}>{brand.nombre}</SelectItem>
            ))}
          </Select>
        </CardBody>
      </Card>
    </>
  );
};

export default Brand;
