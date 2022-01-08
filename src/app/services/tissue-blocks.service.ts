import { Injectable } from '@angular/core'
import { NgElement, WithProperties } from '@angular/elements'
import { TissueBlocksComponent } from '../components/tissue-blocks.component'

@Injectable()
export class TissueBlocksService {
	injectElement() {
    const tissueBlocksEl: NgElement & WithProperties<TissueBlocksComponent> = document.createElement('cns-tissue-blocks') as any
    document.body.appendChild(tissueBlocksEl)
	}
}
