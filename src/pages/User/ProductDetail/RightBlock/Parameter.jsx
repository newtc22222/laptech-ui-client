/** @format */

import { useSelector } from 'react-redux';
function Parameter() {
  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const description = initProductDetail?.data?.product?.specifications;

  const specifications = description ? JSON.parse(description) : [];

  return (
    specifications.length > 0 && (
      <div>
        <h3 className="text-gray-800 mb-4">Cấu hình {initProductDetail?.data?.product?.name}</h3>

        <table className="w-full">
          <tbody>
            {specifications?.map((specification, index) => (
              <tr className={index % 2 ? 'bg-gray-100' : ''}>
                <td>
                  <span>{specification?.attribute}:</span>&emsp;
                </td>
                <td>{specification?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Parameter;
