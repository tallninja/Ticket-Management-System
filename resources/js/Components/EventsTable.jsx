import { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

export default function EventsTable({
    events,
    isAdmin,
    setShowModal,
    setEvent,
    setUpdateMode,
    deleteEvent,
    setShowReservationModal,
}) {
    return (
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            id
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Regular
                        </th>
                        <th scope="col" className="px-6 py-4">
                            VIP
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Max Attendees
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {events?.length ? (
                        events?.map((event) => (
                            <tr
                                key={event.id}
                                className="border-b dark:border-neutral-500"
                            >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {event.id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {event.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {event.description}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {event.regular_ticket_price}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {event.vip_ticket_price}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {event.max_attendees}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 flex flex-row space-x-1">
                                    <PrimaryButton
                                        onClick={() => {
                                            setShowReservationModal(true);
                                            setEvent(event);
                                        }}
                                        className="text-white bg-green-400 hover:bg-green-500"
                                    >
                                        Make Reservation
                                    </PrimaryButton>
                                    {isAdmin && (
                                        <>
                                            <PrimaryButton
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setEvent(event);
                                                    setUpdateMode(true);
                                                }}
                                                className="text-gray-700 bg-yellow-400 hover:bg-yellow-500"
                                            >
                                                Edit
                                            </PrimaryButton>
                                            <PrimaryButton
                                                onClick={() =>
                                                    deleteEvent(event)
                                                }
                                                className="text-white bg-red-400 hover:bg-red-500"
                                            >
                                                Delete
                                            </PrimaryButton>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>No Events.</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}
