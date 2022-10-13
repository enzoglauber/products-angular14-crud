import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '@features/category/category.service';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  constructor(
    private categoryService: CategoryService
  ) { }

  transform(id: number): string {
    const category = this.categoryService.categories.find((item) => item?.id === id);
    return category?.name ?? id.toString();
  }

}
