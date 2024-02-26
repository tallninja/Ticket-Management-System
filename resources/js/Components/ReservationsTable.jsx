import PrimaryButton from "./PrimaryButton";

export default function ReservationsTable({ reservations, cancelReservation }) {
    console.log(reservations);
    return (
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            id
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Event Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Ticket Type
                        </th>
                        <th scope="col" className="px-6 py-4">
                            #Tickets
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Amount Paid
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations?.length ? (
                        reservations?.map((reservation) => (
                            <tr
                                key={reservation.id}
                                className="border-b dark:border-neutral-500"
                            >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {reservation.id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {reservation.event?.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {reservation.type}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {reservation.num_tickets}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {reservation.amount_paid}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 flex flex-row space-x-1">
                                    <PrimaryButton
                                        onClick={() =>
                                            cancelReservation(reservation)
                                        }
                                        className="bg-red-400 hover:bg-red-500"
                                    >
                                        Cancel Reservation
                                    </PrimaryButton>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>No Reservations</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}
