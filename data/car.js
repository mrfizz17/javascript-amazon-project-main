class Car{
    id;
    brand;
    model;
    price;
    speed;
    isTrunkOpen;

    constructor(carDetails){
        this.id=carDetails.id;
        this.brand=carDetails.brand;
        this.model=carDetails.model;
        this.price=carDetails.price;
        this.speed=carDetails.speed;
        this.isTrunkOpen=carDetails.isTrunkOpen;
    }

    displayInfo(){
        console.log(`Car: ${this.brand} ${this.model}, Price: $${this.price}`);
    }

    openTrunk(){
        if(this.speed>0){
            console.log("Cannot open trunk while moving!");
            return;
        }else{  
            this.isTrunkOpen=true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen=false;
    }

    go(){
        if(this.isTrunkOpen){
            console.log("Cannot accelerate with trunk open!");
            return;
        }else{
            this.speed+=5;
            console.log(`Accelerating... Current speed: ${this.speed} mph`);
        }
    }

    break(){
        this.speed-=5;
    }

}


class ElectricCar extends Car{
    batteryCapacity;
    constructor(carDetails){
        super(carDetails);
        this.batteryCapacity=carDetails.batteryCapacity;
    }

    displayInfo(){
        console.log(`Car: ${this.brand} ${this.model}, Price: $${this.price}, 
            Battery Capacity: ${this.batteryCapacity} kWh`);
    }
}

export const car=[
    {
        id:"1",
        brand: "Corolla",
        model:"Toyota",
        price: 20000,
        type:"non-electric",
        speed:0,
        isTrunkOpen: false
    },
    {
        id:"2",
        brand: "Civic",
        model:"Honda", 
        price: 22000,
        type:"non-electric",
        speed:0,
        isTrunkOpen: true
    },
    {
        id:"3",
        brand: "Model S",
        model:"Tesla",
        price: 80000,
        type:"electric",
        batteryCapacity: 100,
        speed:0,
        isTrunkOpen: false
    }
].map((carDetails)=>{
    if(carDetails.type==="electric"){
        return new ElectricCar(carDetails);
    }   else{   
        return new Car(carDetails);
    }
})

console.log(car);

car[0].go();
car[0].break();
car[0].go();

car[2].go();    
car[2].go();
car[2].break();

car[1].go();
car[1].go();
car[1].go();
car[1].break();

car.forEach((carInfo)=>{
    carInfo.displayInfo();
});