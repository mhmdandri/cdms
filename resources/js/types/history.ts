export interface Container {
    id: number;
    container_number: string;
}
export interface Location {
    id: number;
    zone: string;
    rows: number;
    columns: number;
}
export interface Customer {
    id: number;
    name: string;
}
export interface User {
    id: number;
    name: string;
}

export interface History {
    id: number;
    task_id: number;
    type: string;
    condition: string;
    status: string;
    event_time: string;
    notes?: string | null;

    container: Container;
    user: User;
    location: Location;
    customer: Customer;
}
