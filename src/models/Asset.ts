export default interface Asset {
    id: string;
    name: string;
    parentId: string | null;
    sensorId?: string;
    sensorType?: string;
    status?: string;
    gatewayId?: string;
    locationId: string | null
}