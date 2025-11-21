import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, { eager: true })
  student: Student;

  @Column()
  room: string;

  @Column({ type: 'datetime' })
  entryTime: Date;

  @Column({ type: 'datetime', nullable: true })
  exitTime: Date;
}
