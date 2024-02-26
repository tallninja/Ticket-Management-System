import EventForm from "@/Components/EventForm";
import EventsTable from "@/Components/EventsTable";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Dashboard({ auth, events }) {
    const [showEventFormModal, setShowEventFormModal] = useState(false);
    const [event, setEvent] = useState({});
    const [updateMode, setUpdateMode] = useState(false);

    const form = useForm();

    const deleteEvent = (_event) => {
        form.delete(route("events.delete", { id: _event.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Events
                    </h2>
                    {auth.roles
                        .map((role) => role.name)
                        .includes("ROLE_ADMIN") && (
                        <PrimaryButton
                            onClick={() => setShowEventFormModal(true)}
                            className="bg-green-500 text-white px-2 py-1 hover:bg-green-600"
                        >
                            Create Event
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <EventsTable
                                events={events}
                                isAdmin={auth.roles
                                    .map((role) => role.name)
                                    .includes("ROLE_ADMIN")}
                                setShowModal={setShowEventFormModal}
                                setEvent={setEvent}
                                setUpdateMode={setUpdateMode}
                                deleteEvent={deleteEvent}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showEventFormModal}>
                <EventForm
                    eventData={event}
                    showModal={setShowEventFormModal}
                    update={updateMode}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
