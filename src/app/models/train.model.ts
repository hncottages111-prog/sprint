// Train data model - defines what information a train has
export interface Train {
  trainId: number;           // Unique identifier for the train
  trainName: string;         // Name of the train (e.g., "Express 101")
  source: string;           // Starting city
  destination: string;      // Ending city
  departureTime: string;    // What time the train leaves
  arrivalTime: string;      // What time the train arrives
  seatsAvailable: number;   // How many seats are still available
  price: number;           // Cost per ticket in dollars
}