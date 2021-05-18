/* eslint-disable no-console */
import { Enemy, SimpleEnemy, StrongEnemy } from 'games/enemies';
import { enemyManager } from 'games/managers/enemy-manager';
import { Position } from 'games/typing';
import { sleep } from 'games/helpers';

export interface WaveGroup {
  EnemyClass: new (p: Position) => Enemy;
  quantity: number;
  delay: number;
  life: number;
}

export type Wave = WaveGroup[];

export class WavesManager {
  private startPosition: Position;

  public waveCounter = 1;
  public looping = false;

  constructor(startPosition: Position) {
    this.startPosition = startPosition;
  }

  async start() {
    const wave = this.generateWave();

    for (let i = 0; i < wave.length; i += 1) {
      const { EnemyClass, quantity, delay, life } = wave[i];

      for (let j = 0; j < quantity; j += 1) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay);

        const entity = new EnemyClass({ ...this.startPosition });
        entity.setLife(life);
        entity.setSpeed(this.getSpeed(entity));
        enemyManager.add(entity);
      }
    }
  }

  private generateWave(): Wave {
    const wave: Wave = [];
    const ratio = 1 + this.waveCounter / 10;

    if (this.waveCounter % 8 === 0) {
      // TODO: добавить босса в игру
      wave.push({
        EnemyClass: StrongEnemy,
        quantity: Math.floor(this.waveCounter / 10),
        delay: 3350,
        life: ratio,
      });
    } else {
      if (Math.random() > 0.7) {
        wave.push({
          EnemyClass: StrongEnemy,
          quantity: Math.floor(2 + this.waveCounter / 5),
          delay: Math.max(2500 - this.waveCounter, 1000),
          life: ratio,
        });
      }

      wave.push({
        EnemyClass: SimpleEnemy,
        quantity: Math.floor(10 + this.waveCounter),
        delay: Math.max(2400 - this.waveCounter, 1000),
        life: ratio,
      });
    }

    return wave;
  }

  private getSpeed(enemy: Enemy): number {
    return Math.min(1 + this.waveCounter / 30, enemy.getSpeed());
  }
}
