import * as Table from 'cli-table3';
import { chalkScheme } from './utils';
import { Stats } from './stats';

export default class TBTable {
  public config: Table.TableConstructorOptions;
  public table: any;
  public display: Stats[];
  private heading: string;
  constructor(heading: string) {
    this.heading = heading;
    this.config = this.initConfig();
    this.table = new Table(this.config) as Table.HorizontalTable;
    this.display = [];
  }
  public render(): string {
    this.setTableData();
    return this.table.toString();
  }
  private setTableData() {
    this.display.forEach(stat => {
      this.table.push(
        [{ colSpan: 2, content: `${this.heading}` }],
        [
          `${stat.name}`,
          { hAlign: 'right', content: `${chalkScheme.imprv('✔')}` },
        ],
        ['Significant', { hAlign: 'right', content: `${stat.significance}` }],
        ['Estimator Δ', { hAlign: 'right', content: `${stat.estimator}μs` }],
        [
          'Distribution',
          {
            hAlign: 'right',
            content: `${stat.range.min}μs to ${stat.range.max}μs`,
          },
        ],
        [
          'Control',
          { hAlign: 'right', content: `${stat.controlDistribution}` },
        ],
        [
          'Experiment',
          { hAlign: 'right', content: `${stat.experimentDistribution}` },
        ],
        []
      );
    });
  }
  private initConfig() {
    return {
      colWidths: [20, 30],
      chars: {
        top: '═',
        'top-mid': '─',
        'top-left': '╔',
        'top-right': '╗',
        bottom: '═',
        'bottom-mid': '═',
        'bottom-left': '╚',
        'bottom-right': '╝',
        left: '║',
        'left-mid': '║',
        mid: '─',
        'mid-mid': '─',
        right: '║',
        'right-mid': '║',
        middle: '│',
      },
    };
  }
}

// create a new tbtable for each route
// let routes = ['/feed', '/profile']
// each routes new TBTable()

// cli.log(`\n\n${newBenchMarkTable.toString()}`);