frameworkObject = nil
CurrentVehicleshop = nil
local cam = nil
local SelectedVehicleProps = nil

Citizen.CreateThread(function()
    frameworkObject, Config.Framework = GetCore()
    while not frameworkObject do
        Citizen.Wait(0)
    end
end)

function OpenVehicleshop(k)
    local data = Callback('real-vehicleshop:GetVehicleshopData', k)
    local OwnerStatus = nil
    if Config.Vehicleshops[k].Owner == "" then
        OwnerStatus = false
    else
        OwnerStatus = true
    end


    if data then
        DisplayRadar(false)
        DisplayHud(false)
        SetEntityCoords(PlayerPedId(), Config.Vehicleshops[k].CamSettings.PlayerPos)
        cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.Vehicleshops[k].CamSettings.Coords.x, Config.Vehicleshops[k].CamSettings.Coords.y,Config.Vehicleshops[k].CamSettings.Coords.z  + 0.5, 0.00, 0.00, 120.00, 50.00, false, 0)
        SetCamActive(cam, true)
        RenderScriptCams(true, false, 1, true, true)
        DoScreenFadeIn(1000)
        SetEntityVisible(PlayerPedId(), false)
        SendNUIMessage({
            action = 'OpenVehicleshop',
            hasowner = OwnerStatus,
            playername = data.Name,
            playermoney = data.Money,
            playerpfp = data.Pfp,
            vehicleshop = k,
            vehicleshopname = Config.Vehicleshops[k].CompanyName,
            vehicleshopdescription = Config.Vehicleshops[k].CompanyDescriptionText,
            vehicleshoprating = Config.Vehicleshops[k].Rating,
            vehicles = OwnerStatus and Config.Vehicleshops[k].Vehicles or Config.VehiclesData,
            categories = Config.Vehicleshops[k].Categories,
            feedbacks = Config.Vehicleshops[k].Feedbacks,
            discount = Config.Vehicleshops[k].Discount,
            raise = Config.Vehicleshops[k].Raise,
        })
        SetNuiFocus(true, true)
        CurrentVehicleshop = k
    end
end

function CloseUI()
    RenderScriptCams(false)
    DestroyCam(cam, true)
    SetEntityVisible(PlayerPedId(), true)
    SetEntityCoords(PlayerPedId(), Config.Vehicleshops[CurrentVehicleshop].ShopOpenCoords, true)
    SetNuiFocus(false, false)
    if CreatedSelectedVehicle then
        DeleteVehicle(CreatedSelectedVehicle)
    end
end

function CamControl(c)
	if c == "back" then
		MoveVehCam('back',0,-2,1)
    elseif c == "reset" then
        ResetCam()
    end
end

function ResetCam()
    cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", Config.Vehicleshops[CurrentVehicleshop].CamSettings.Coords.x, Config.Vehicleshops[CurrentVehicleshop].CamSettings.Coords.y, Config.Vehicleshops[CurrentVehicleshop].CamSettings.Coords.z  + 0.5, 0.00, 0.00, 90.00, 50.00, false, 0)
    SetCamActive(cam, true)
    RenderScriptCams(true, false, 1000, true, true)     
end

function CreateSelectedVehicle(vehiclehash)
    local Player = PlayerPedId()
    CamControl('reset')
    RequestModel(GetHashKey(vehiclehash))
    while not HasModelLoaded(vehiclehash) do
        Wait(0)
    end
    if CreatedSelectedVehicle then
        DeleteVehicle(CreatedSelectedVehicle)
    end
    CreatedSelectedVehicle = CreateVehicle(vehiclehash, Config.Vehicleshops[CurrentVehicleshop].CamSettings.VehiclePos, false, true)
    TaskWarpPedIntoVehicle(Player, CreatedSelectedVehicle, -1)
    local Heading = GetEntityHeading(CreatedSelectedVehicle)
    SetPedIntoVehicle(Player, CreatedSelectedVehicle, -1)
    SetEntityHeading(Player, Heading)
    SetVehicleNumberPlateText(CreatedSelectedVehicle, GeneratePlate())
    SetVehicleRadioEnabled(CreatedSelectedVehicle, false)
    SetVehicleFixed(CreatedSelectedVehicle)
    SetVehicleDirtLevel(CreatedSelectedVehicle, 0.1)
    SelectedVehicleProps = GetVehicleProperties(CreatedSelectedVehicle)
    SendNUIMessage({
        action = 'UpdateCreateSelectedVehicle',
        speed = GetVehicleEstimatedMaxSpeed(CreatedSelectedVehicle) * 3.6,
        brake = GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fBrakeForce") * GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fBrakeBiasFront") * 100,
        acceleration = GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fInitialDriveMaxFlatVel") * GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fInitialDriveForce"),
        suspension = GetVehicleHandlingFloat(CreatedSelectedVehicle, 'CHandlingData', 'fSuspensionForce'),
        handling = (GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fSteeringLock") + GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fTractionBiasFront") - GetVehicleHandlingFloat(CreatedSelectedVehicle, "CHandlingData", "fTractionLossMult")) * 2,
        plate = GetVehicleNumberPlateText(CreatedSelectedVehicle)
    })
end

RegisterNUICallback('CloseUI', CloseUI)
RegisterNUICallback('CreateSelectedVehicle', CreateSelectedVehicle)