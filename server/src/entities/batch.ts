import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {Student, Evaluation} from './index'

@Entity()
export class Batche extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  number: number

  @Column('text')
  fullName: string

  @Column('date')
  startDate: string

  @Column('date')
  endDate: string

  @OneToMany(_ => Student, student => student.batch)
  @JoinColumn()
  students: Student[]

  @OneToMany(_ => Evaluation, evaluation => evaluation.batch)
  @JoinColumn()
  evaluations: Evaluation[]
}