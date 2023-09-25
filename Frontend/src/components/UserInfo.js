import { useEffect, useState } from "react";

const UserInfo = ({ userData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dbConnect = async () => {
      const response = await fetch("/api/v1/info");

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.msg;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setData(data);
    };
    dbConnect();
  }, []);

  return (
    <>
      {userData?.user?.role === "admin" && (
        <div className="w3-container">
          <h2>User Details</h2>

          <table className="w3-table-all w3-hoverable  w3-centered">
            <thead>
              <tr className="w3-light-grey">
                <th>Name</th>
                <th>Email</th>
                <th>Mobile no.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.userDetails?.name}</td>
                <td>{data?.userDetails?.email}</td>
                <td>{data?.userDetails?.mobileno}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="w3-container">
        <h2>User Sessions</h2>

        <table className="w3-table-all w3-hoverable  w3-centered">
          <thead>
            <tr className="w3-light-grey">
              <th>Previous Login</th>
              <th>Session time(seconds)</th>
              <th>messages</th>
            </tr>
          </thead>
          <tbody>
            {data?.info?.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.loginTime).toLocaleString()}</td>
                <td>{item.sessionTime}</td>
                <td>
                  <ul>
                    {item.messages.map((message, index) => (
                      <ol key={index}>{message}</ol>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
