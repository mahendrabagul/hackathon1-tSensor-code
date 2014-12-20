package com.neova.hdinterface.quartz.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.neova.hdinterface.quartz.task.PushHourlyDataTask;

public class PushHourlyDataJob extends QuartzJobBean {
	
	private PushHourlyDataTask pushHourlyDataTask;
	
	public void setPushHourlyDataTask(PushHourlyDataTask pushHourlyDataTask) {
		this.pushHourlyDataTask = pushHourlyDataTask;
	}

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		pushHourlyDataTask.pushHourlyData();
	}//End of executeInternal() Method.
}//End of PushHourlyDataJob Class.
