import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
  const axiosCommon = UseAxiosCommon();
  const {
    data: payment = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/payments/payment");
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <section className="container p-10 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="flex items-center">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Payment History
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {payment.length} records
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    <tr>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-white">
                        Serial No
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-white">
                        Transaction ID
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-white">
                        Amount
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-white">
                        Package Name
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-white">
                        User Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {payment.map((paymentDetail, index) => (
                      <tr key={paymentDetail.paymentId}>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                          {paymentDetail.transactionId}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                          ${paymentDetail.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                          {paymentDetail.package_name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap dark:text-gray-300">
                          {paymentDetail.user_email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentHistory;
