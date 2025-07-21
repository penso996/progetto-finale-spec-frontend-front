export type Headphone = {
    title: string;
    brand: string;
    imageUrl: string;
    retailPrice: number;
    category: 'over-ear' | 'on-ear' | 'in-ear';
    type: 'open-back' | 'closed-back' | 'semi-open';
    frequencyProfile: 'v-shaped' | 'flat' | 'warm' | 'bright' | 'neutral';
    isWireless: boolean;
    weight: string;
}