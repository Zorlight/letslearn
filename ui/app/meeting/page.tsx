"use client";

import GLOBAL from "@/global";
import {
    ConnectionState,
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useConnectionState,
    useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const [token, setToken] = useState("");

    useEffect(() => {
        fetch(
            GLOBAL.MEETING_URL + `/v1/meeting/abc_this_is_a_test_meeting`,
            {
                method: "POST",
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    toast.error("Failed to get token");
                }
            })
            .then((data) => {
                setToken(data.token);
            })
            .catch((err) => toast.error("Failed to create room"));
    }, []);

    if (!token) {
        return <div>Loading...</div>;
    }

    return (
        <div>Created: abc_this_is_a_test_meeting_id</div>
    );
}