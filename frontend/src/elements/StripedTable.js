import React from "react"

function StripedTable() {
  const thClass =
    "px-4 py-4 text-left bg-blue-900 text-white text-sm font-medium"
  const tdClass = "px-4 py-8 border-t border-b border-gray-300 text-sm"
  const trClass = "border-gray-300 even:bg-gray-300"
  return (
    <table className="w-full table-auto rounded-sm">
      <thead>
        <tr>
          <th className={thClass}>Restaurant</th>
          <th className={thClass}>Food</th>
          <th className={thClass}>Date Eaten</th>
          <th className={thClass}>Rating</th>
          <th className={thClass}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://www.brandingmag.com/wp-content/uploads/2012/08/D-FINAL.png"
              className="h-8"
            />
          </td>
          <td className={tdClass}>Pizza</td>
          <td className={tdClass}>March 1st</td>
          <td className={tdClass}>9</td>
          <td className={tdClass}>$10</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://i.pinimg.com/originals/58/d7/9a/58d79a969ace9ba5c35fc12dd73cedb2.jpg"
              className="h-8"
            />
          </td>
          <td className={tdClass}>Hot Dog</td>
          <td className={tdClass}>March 5th</td>
          <td className={tdClass}>10</td>
          <td className={tdClass}>5</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://cdn.worldvectorlogo.com/logos/hanes-4.svg"
              className="h-8"
            />
          </td>
          <td className={tdClass}>Sock</td>
          <td className={tdClass}>March 12th</td>
          <td className={tdClass}>4</td>
          <td className={tdClass}>Free</td>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://logos-download.com/wp-content/uploads/2016/04/Five_Guys_logo_logotype_burgers_and_fries.png"
              className="h-8"
            />
          </td>
          <td className={tdClass}>Burger</td>
          <td className={tdClass}>March 31st</td>
          <td className={tdClass}>10</td>
          <td className={tdClass}>$7</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StripedTable