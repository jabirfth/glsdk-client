
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { Agent } from '../../../shared/sdk/models/Agent';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {

  agent: Agent;

  constructor(
    private agentService: AgentService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => this.agentService.getAgentById(paramMap.get('id'))))
      .subscribe((agent: Agent) => {
        this.agent = agent;
      });
  }

}
