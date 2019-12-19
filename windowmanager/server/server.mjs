import * as alt from 'alt';
import * as chat from 'chat';

alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
    alt.emitClient(player, 'playerEnteredVehicle', vehicle, seat);
});

alt.on('playerLeftVehicle', (player, vehicle, seat) => {
    alt.emitClient(player, 'playerLeftVehicle', vehicle, seat);
});

// All Windows Down
chat.registerCmd('wdown', (player, vehicle) => {
    allWindowsDown(player, vehicle);
});

// All Windows Up
chat.registerCmd('wup', (player, vehicle) => {
    allWindowsUp(player, vehicle);
});

// *********************** //
// **** WINDOW TINTS **** //
// ********************* //
chat.registerCmd('tint', (player, vehicle) => {
    requestTint(player, vehicle);
});

function requestTint(player, vehicle) {
    try {
        let vehicle = player.vehicle;
        alt.emitClient(player, 'requestTint', vehicle);
    } catch (err) {
        chat.send(player, 'Request Tint Script Error');
    }
}

alt.onClient('tintSuccess', (player, vehicle) => {
    vehicle.modKit = 1;
    vehicle.windowTint = 1;
    let tintValue = vehicle.windowTint;
    console.log(tintValue);
});

/* ------------------------------------ */
/*   ROLLING WINDOWS ON CLIENT EVENTS  */
/* ------------------------------------ */
alt.onClient('noVehicle', player => {
    chat.send(player, '{FF0000} You are not in a vehicle!');
    return;
});

alt.onClient('notDriver', player => {
    chat.send(player, '{FF0000} You are not the driver of the vehicle!');
    return;
});

function allWindowsDown(player, vehicle) {
    try {
        let vehicle = player.vehicle;
        alt.emitClient(player, 'window:allDown', vehicle);
    } catch (err) {
        chat.send(player, 'Window Down Script Error');
    }
}

function allWindowsUp(player, vehicle) {
    try {
        let vehicle = player.vehicle;
        alt.emitClient(player, 'window:allUp', vehicle);
    } catch (err) {
        chat.send(player, 'Window Up Script Error');
    }
}

// alt.onClient('wrongClass', () => {
//     chat.send(player, '{FF0000} You are not in the correct type of vehicle!');
// });
