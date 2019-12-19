import * as alt from 'alt';
import * as native from 'natives';

let isInVehicle = false;
let pedInSeat = undefined;
let player = alt.Player.local;

alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
    pedInSeat = seat;
    isInVehicle = true;
    alt.log('Player entered vehicle.');
    return;
});

alt.onServer('playerLeftVehicle', (vehicle, seat) => {
    pedInSeat = undefined;
    isInVehicle = false;
    alt.log('Player left vehicle.');
    return;
});

/* ALL WINDOWS DOWN */
alt.onServer('window:allDown', vehicle => {
    checkClass();
    if (isInVehicle === false) {
        alt.emitServer('noVehicle');
        return;
    } else if (pedInSeat != 1) {
        alt.log(pedInSeat);
        alt.emitServer('notDriver');
        return;
    }
    native.rollDownWindows(vehicle.scriptID);
    alt.log('ALL WINDOWS ARE NOW DOWN.');
});

/* ALL WINDOWS UP */
alt.onServer('window:allUp', vehicle => {
    checkClass();
    if (isInVehicle === false) {
        alt.emitServer('noVehicle');
        return;
    } else if (pedInSeat != 1) {
        alt.log(pedInSeat);
        alt.emitServer('notDriver');
        return;
    }
    // rollUpWindows(vehicle.scriptID)
    native.rollUpWindow(vehicle.scriptID, 0);
    native.rollUpWindow(vehicle.scriptID, 1);
    native.rollUpWindow(vehicle.scriptID, 2);
    native.rollUpWindow(vehicle.scriptID, 3);
    alt.log('ALL WINDOWS ARE NOW UP.');
});

// REQUEST VEHICLE TINT TO BE ADDED ON VEHICLE
alt.onServer('requestTint', vehicle => {
    if (isInVehicle === false) {
        alt.emitServer('noVehicle');
        return;
    }
    native.setVehicleWindowTint(alt.Player.local.vehicle.scriptID, 1);
    alt.log('Windows are now tinted.');
    alt.emitServer('tintSuccess', vehicle);
});

// function rollUpWindows(vehicle) {
//     native.rollUpWindow(alt.Player.local.vehicle.scriptID, 0);
//     native.rollUpWindow(alt.Player.local.vehicle.scriptID, 1);
//     native.rollUpWindow(alt.Player.local.vehicle.scriptID, 2);
//     native.rollUpWindow(alt.Player.local.vehicle.scriptID, 3);
// }

// function checkClass(vehicle) {
//     const blockedClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Blocks Aeroplanes, Boats, etc.
//     let vehClass = native.getVehicleClass(vehicle);

//     if (vehClass === blockedClasses) {
//         alt.log(vehicleClass);
//         alt.emitServer('wrongClass');
//         return;
//     }
// }
