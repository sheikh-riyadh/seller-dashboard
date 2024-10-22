import Table from "../../Common/Table";

const ManageReviewTable = () => {
  return (
    <div>
      <div>
        <Table
          columns={[
            {
              name: "Payment Status",
              dataIndex: "paymentStatus",
              key: "paymentStatus",
            },
            {
              name: "Payment Method",
              dataIndex: "paymentType",
              key: "paymentType",
            },
            {
              name: "Actions",
              render: () => {
                return (
                  <div className="flex flex-col gap-2">
                    <span className="text-primary cursor-pointer border text-center p-2 rounded-full">
                      Manage
                    </span>
                    <span className="text-primary cursor-pointer border text-center p-2 rounded-full">
                      Update order status
                    </span>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ManageReviewTable;
