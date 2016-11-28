import { View } from "../View";

export class TabItem {
    public name: string;
    public isEnabled: boolean;
    // Maybe icon if supported?
    public view: View;
}

export class TabContainer extends View {
    public tabs: TabItem[];
    public selectedTab: number;
}