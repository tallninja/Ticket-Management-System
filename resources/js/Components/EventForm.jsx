import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

export default function EventForm({ eventData, showModal, update }) {
    const { data, setData, post, patch, processing, errors } = useForm({
        name: eventData.name,
        description: eventData.description,
        regular_ticket_price: eventData.regular_ticket_price,
        vip_ticket_price: eventData.vip_ticket_price,
        max_attendees: eventData.max_attendees,
    });

    const submit = (e) => {
        e.preventDefault();
        update
            ? patch(route("events.update", { id: eventData.id }))
            : post(route("events.create"));
        showModal(false);
    };

    return (
        <form class="w-full px-10 pt-6 pb-8 rounded" onSubmit={submit}>
            <div className="flex justify-between">
                <div>
                    <InputLabel value="Name" />
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel value="Max Attendees" />
                    <TextInput
                        type="number"
                        value={data.max_attendees}
                        onChange={(e) =>
                            setData("max_attendees", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.max_attendees}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="flex justify-between my-3">
                <div>
                    <InputLabel value="Regular" />
                    <TextInput
                        type="number"
                        value={data.regular_ticket_price}
                        onChange={(e) =>
                            setData("regular_ticket_price", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.regular_ticket_price}
                        className="mt-2"
                    />
                </div>
                <div>
                    <InputLabel value="VIP" />
                    <TextInput
                        type="number"
                        value={data.vip_ticket_price}
                        onChange={(e) =>
                            setData("vip_ticket_price", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.vip_ticket_price}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="w-full">
                <InputLabel value="Description" />
                <textarea
                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                    type="text"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="flex justify-between mt-5">
                <PrimaryButton
                    onClick={() => showModal(false)}
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
