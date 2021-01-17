/*
TODO: validate input
*/
interface IProps {

}

interface IState {
    startCap: number;
    moSav: number;
    period: number;
    yield: number;
    schIncPer: number;
    schInc: number;
}

class SavingsForm extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            startCap: 10000,
            moSav: 250,
            period: 40,
            yield: 7,
            schIncPer: 0,
            schInc: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayResults();
    }

    render() {
        let form =
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="startCap">Startkapital</label>
                <input name="startCap" type="number" min="0"
                    value={this.state.startCap} onChange={this.handleChange} />

                <label htmlFor="moSav">Månadsparande</label>
                <input name="moSav" type="number" min="0"
                    value={this.state.moSav} onChange={this.handleChange} />

                <label htmlFor="period">Antal år: {this.state.period}</label>
                <input name="period" type="range" min="1" max="100" step="1"
                    value={this.state.period} onChange={this.handleChange} />

                <label htmlFor="yield">Avkastning per år: {this.state.yield}%</label>
                <input name="yield" type="range" min="0" max="50" step="0.5"
                    value={this.state.yield} onChange={this.handleChange} />

                <label className="boring" htmlFor="schIncPer">Hur ofta ökar sparandet?</label>
                <input className="boring" name="schIncPer" type="number" min="0" max="100"
                    value={this.state.schIncPer} onChange={this.handleChange} />

                <label className="boring" htmlFor="schInc">Hur mycket ökar sparande?</label>
                <input className="boring" name="schInc" type="number" min="0"
                    value={this.state.schInc} onChange={this.handleChange} />
                <input type="submit" value="Räkna" />
            </form>
        return form;
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            /* all input is a number or float, needs to cast to a number otherwise something breaks */
            [e.target.name]: parseFloat(value)
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.displayResults();
    }

    // TODO: This feels ugly and bad, not ReactJS-y at all
    displayResults() {
        /* Create SavingsTable */
        let results = this.calculateSavings();
        ReactDOM.render(<SavingsTable savings={results} />, document.getElementById("savingsTable"));
        
        /* Start with setting up data for the chart and creating the chart */
        let savedWithYield: number[] = [],
            savedNoYield: number[] = [],
            difference: number[] = [],
            chartLabels: string[] = [];

        results.forEach(result => {
            chartLabels.push(result.year.toString());
            savedWithYield.push(result.resultWithYield);
            difference.push(result.resultDiff);
            savedNoYield.push(result.resultNoYield);
        });

        createOrUpdateChart(chartLabels, savedWithYield, savedNoYield, difference);
    }

    calculateSavings(): Savings[] {
        let yd: number = (this.state.yield / 100) + 1;
        let calc = new Calculator(this.state.startCap, this.state.period, this.state.moSav, yd, this.state.schIncPer, this.state.schInc);
        return calc.calculateSavings();
    }
}

ReactDOM.render(<SavingsForm />, document.getElementById("savingsForm"));