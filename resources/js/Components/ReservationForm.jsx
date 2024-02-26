import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

export default function ReservationForm({ showModal, event }) {
    const { data, setData, post, processing, errors } = useForm({
        event_id: event.id,
        type: "regular",
        num_tickets: 1,
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("reservations.store"));
        showModal(false);
    };

    return (
        <form className="w-full px-10 pt-6 pb-8 rounded" onSubmit={submit}>
            <div className="w-full">
                <InputLabel value="Number Of Tickets" />
                <TextInput
                    className="w-full"
                    type="number"
                    min={1}
                    max={5}
                    value={data.num_tickets}
                    onChange={(e) => setData("num_tickets", e.target.value)}
                />
                <InputError message={errors.num_tickets} className="mt-2" />
            </div>

            <div className="w-full mt-3">
                <InputLabel value="Ticket Type" />
                <select
                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                >
                    <option value="regular">Regular</option>
                    <option value="vip">VIP</option>
                </select>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div className="flex justify-between mt-5">
                <PrimaryButton
                    onClick={(e) => {
                        e.preventDefault();
                        showModal(false);
                    }}
                    className="bg-red-500 hover:bg-red-600"
                    disabled={processing}
                >
                    Cancel
                </PrimaryButton>
                <PrimaryButton
                    className="bg-green-500 hover:bg-green-600"
                    disabled={processing}
                >
                    Submit
                </PrimaryButton>
            </div>
        </form>
    );
}
