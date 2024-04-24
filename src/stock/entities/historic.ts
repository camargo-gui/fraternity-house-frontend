import { formatDate } from '../../utils/format-date';
import { type Product } from './product';

export class Movimentation {
  public constructor(
    public id: number,
    public type: string,
    public id_employee: number,
    public employee_name: string,
    public created_at: Date | string,
    public products: Product[],
  ) {}

  public toDomain(): Movimentation {
    return new Movimentation(
      this.id,
      this.translateType(),
      this.id_employee,
      this.employee_name,
      formatDate(new Date(this.created_at)),
      this.products,
    );
  }

  private translateType(): string {
    return this.type === 'INPUT' ? 'Entrada' : 'Saída';
  }
}
