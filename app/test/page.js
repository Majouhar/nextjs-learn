import React from "react";
import fs from "fs/promises";
import path from "path";

//This will refresh the fetch after 10 seconds
export const revalidate = 10

//This will load page from server all the time
// export const dynamic = 'force-dynamic'

async function TestPage() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export default TestPage;
