import reference from "./reference";

export default class Util {
    public static formatModifier(val: number): string {
        if (val === null) {
            return '';
        }

        if (val > 0)
            return "+" + val;
        return val + '';
    };

    public static d6() {
        // D6 roll
        return Math.floor(Math.random() * 6) + 1;
    };

    public static dX(x: number) {
        // DX roll
        return Math.floor(Math.random() * x) + 1;
    };

    public static statRoll(): number {
        // Standard stat roll: 4d6, subtract lowest, get total of remaining
        var diceArray = [...new Array(4)]
            .map(() => this.d6())
            .sort((a, b) => a - b)
            .reverse();
        diceArray.pop();
        return diceArray.reduce((a, b) => a + b, 0);
    };
    
    public static getModifier(val: number): number {
        // Get stat modifier from lookup table
        for (let mod of reference.statModifiers) {
            if (val <= mod.val) {
                return mod.modifier;
            }
        }

        return reference.statModifiers[reference.statModifiers.length - 1].modifier;
    };
}